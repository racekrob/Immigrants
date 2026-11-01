# Italia – Explore with all senses

Desková hra pro 2–6 hráčů (lidé i počítač) na jednom zařízení – mobil i počítač.
Sbírejte pochutiny, vína a pamětihodnosti Itálie, inkasujte výplaty v bankách Milano, Ancona a Roma
a vybírejte poplatky od soupeřů.

## Spuštění
Hra je jediná statická stránka (`index.html`) bez serveru a bez instalace. Stačí ji otevřít v prohlížeči,
nebo zveřejnit přes GitHub Pages:

1. Vytvořte repozitář (např. `Italia`) a nahrajte do něj **všechny soubory z této složky** (Add file → Upload files → Commit changes).
2. V repozitáři otevřete **Settings → Pages**, zvolte *Deploy from a branch*, větev `main` a složku `/ (root)`.
3. Za chvíli bude hra na adrese `https://<uživatel>.github.io/italia/`.

Na telefonu lze stránku přidat na plochu („Přidat na plochu“) – spustí se jako aplikace.

## Obsah
| Soubor | Co obsahuje |
|---|---|
| `index.html` | celá hra – mapa, pravidla, počítačoví hráči, vlajky a bankovky (vloženo přímo v souboru) |
| `Karta-*.jpg`, `Specialni-*.jpg` | obrázky 76 karet políček a 11 speciálních karet |
| `fb-app.js`, `fb-auth.js`, `fb-db.js` | knihovna Firebase pro online hru (databáze Firebase projektu Immigrants; hry se ukládají pod `ewas/italia/<kód>` – EWAS = Explore With All Senses) |
| `manifest.json`, `icon-*.png` | ikona a nastavení pro „Přidat na plochu“ |

Rozehraná hra se ukládá v prohlížeči (localStorage) daného zařízení.

## Online hra
Zakladatel nastaví hráče (sebe a spoluhráče jako „Člověk“), klepne na **Založit online hru** a pošle ostatním čtyřmístný kód
nebo odkaz. Ostatní klepnou na **Připojit se**. Hru řídí zařízení zakladatele (hraje i za počítače), ostatní posílají své tahy.
Pro test bez internetu lze otevřít stránku s `?mock=1` ve dvou oknech stejného prohlížeče.

Pravidla databáze Firebase (Realtime Database → Rules) musí povolit větev `ewas`:

```json
{
  "rules": {
    "games": { "$code": { ".read": "auth != null", ".write": "auth != null" } },
    "ewas": { "$country": { "$code": { ".read": "auth != null", ".write": "auth != null" } } }
  }
}
```
