<?php
// Wymuś odpowiedź w formacie JSON
header('Content-Type: application/json; charset=utf-8');

// Odrzucamy wszystkie żądania poza POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Metoda niedozwolona']);
    exit;
}

// 1. HONEYPOT: Weryfikacja Anty-Bot
// Jeśli niewidoczne pole 'website_url' zostało wypełnione, to znaczy że uzupełnił je bot.
if (!empty($_POST['website_url'])) {
    // Zwracamy fałszywy sukces, aby zadowolić bota, ale nie wysyłamy maila.
    echo json_encode(['success' => true]);
    exit;
}

// Oczyszczanie wejścia
$name = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(trim($_POST['subject'] ?? ''), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$message) {
    echo json_encode(['success' => false, 'error' => 'Brakujące lub nieprawidłowe dane.']);
    exit;
}

// 2. Dołączenie PHPMailer (Instalacja Manualna)
// Wymagamy obecności tych plików – jeśli ich brakuje, skrypt natychmiast zgłosi błąd krytyczny (require).
require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    // 3. Konfiguracja Serwera SMTP (Home.pl)
    $mail->isSMTP();
    $mail->Host       = 'smtp.home.pl'; // Zgodnie ze specyfikacją home.pl
    $mail->SMTPAuth   = true;
    $mail->Username   = 'contact@amberresilience.eu'; // Twój pełny adres e-mail na home.pl
    $mail->Password   = 'TUTAJ_WPISZ_HASLO_DO_SKRZYNKI'; // Hasło do poczty
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Włącz SSL
    $mail->Port       = 465; // Port SSL dla home.pl
    $mail->CharSet    = 'UTF-8';

    // 4. Ustawienia wiadomości
    // Home.pl wymaga, aby 'setFrom' zgadzało się z uwierzytelnianym mailem
    $mail->setFrom('contact@amberresilience.eu', 'Amber Resilience Formularz');
    $mail->addAddress('contact@amberresilience.eu'); // Odbiorca
    $mail->addReplyTo($email, $name); // Aby móc klinąć "Odpisz" bezpośrednio do klienta

    $mail->Subject = empty($subject) ? "Nowe zapytanie z formularza od: $name" : "Zapytanie: $subject";
    
    // 5. Czysty, surowy design maila
    $mail->isHTML(false);
    $mail->Body = "Otrzymano nową wiadomość z formularza Amber Resilience.\n\n" .
                  "----------------------------------------\n" .
                  "Nadawca: $name\n" .
                  "E-mail: $email\n" .
                  "Temat: $subject\n" .
                  "----------------------------------------\n\n" .
                  "Treść wiadomości:\n$message\n\n" .
                  "----------------------------------------\n" .
                  "Data nadania: " . date('Y-m-d H:i:s');

    $mail->send();
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Błąd serwera pocztowego.']);
}
?>