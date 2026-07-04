class PremiumFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
                        <footer class="bg-brand-surface pt-32 pb-10 relative z-10">
                <div class="max-w-7xl mx-auto px-8 md:px-16">
                    <div class="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-16 border-b border-white/5 pb-10">
                        <a href="index.html" class="font-display tracking-[0.2em] uppercase text-xl text-brand-ivory">Amber Resilience</a>
                        
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mb-16 max-w-3xl">
                        <div>
                            <h4 class="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-6">Najważniejsze informacje</h4>
                            <ul class="space-y-4">
                                <li><a href="#" class="font-light text-brand-muted text-sm hover:text-brand-ivory transition-colors duration-300">Jednostki budżetowe</a></li>
                                <li><a href="#" class="font-light text-brand-muted text-sm hover:text-brand-ivory transition-colors duration-300">Realizacja, dostawa, płatności</a></li>
                                <li><a href="zwrotu-i-reklamacje.html" class="font-light text-brand-muted text-sm hover:text-brand-ivory transition-colors duration-300">Zwroty i reklamacje</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-6">Bezpieczne zakupy</h4>
                            <ul class="space-y-4">
                                <li><a href="/regulamin-sklepu/" class="font-light text-brand-muted text-sm hover:text-brand-ivory transition-colors duration-300">Regulamin sklepu</a></li>
                                <li><a href="/polityka-prywatnosci/" class="font-light text-brand-muted text-sm hover:text-brand-ivory transition-colors duration-300">Polityka prywatności</a></li>
                                <li>
                                    <a href="#" class="font-light text-brand-muted text-sm hover:text-brand-ivory transition-colors duration-300 inline-flex items-center gap-2 group/link">
                                        Ustawienia plików cookies
                                        <svg class="w-3 h-3 text-brand-muted/50 group-hover/link:text-brand-ivory transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="pt-8 border-t border-white/5 flex flex-col items-center justify-center text-center">
                        <p class="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-gold leading-loose max-w-4xl">
                            Amber Resilience <span class="text-brand-muted/50 mx-2">•</span> ul. Rynkowa 9, 05-816 Michałowice <span class="text-brand-muted/50 mx-2">•</span> NIP 5222822863 <span class="text-brand-muted/50 mx-2">•</span> +48 603 808 258 <span class="text-brand-muted/50 mx-2">•</span> <a href="#" 
   class="obfuscated-link hover:text-brand-ivory transition-colors duration-300 font-mono" 
   data-user="contact" 
   data-domain="amberresilience.eu" 
   aria-label="Wyślij wiadomość e-mail">
   Ładowanie adresu...
</a>
                        </p>
                        <p class="font-mono text-[8px] uppercase tracking-[0.3em] text-brand-gold/60 mt-6">© 2026 Amber Resilience . Wszystkie prawa zastrzeżone.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Rejestracja customowego tagu
customElements.define('premium-footer', PremiumFooter);
