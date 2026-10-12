# yoenia.se – personlig portfölj

Portfölj för **Yoenia Malmebo**: verksamhetsledare/samordnare inom social omsorg. Examensarbetet handlar om självbestämmande i gruppbostad enligt LSS.

## Publik länk

Den här adressen kan klistras in på LinkedIn (inlägg eller Utvalt):

**https://yoenia.github.io/yoenia-portfolio/**

[![Öppna portföljen](https://img.shields.io/badge/Öppna-portföljen-0f6e56?style=for-the-badge)](https://yoenia.github.io/yoenia-portfolio/)

## Köra lokalt

### Enklast: Dev Container i Cursor (rekommenderas)

Du behöver **inte** installera Java manuellt.

1. Öppna mappen `yoenia-portfolio` i Cursor.
2. **Command Palette** (`Ctrl+Shift+P`) → **Dev Containers: Reopen in Container**.
3. Vänta tills containern byggts (första gången tar några minuter).
4. I terminalen:

```bash
mvn spring-boot:run
```

5. Cursor öppnar ofta webbläsaren automatiskt på [http://localhost:8080](http://localhost:8080).

**Alternativ:** `Terminal` → `Run Task` → **Portfölj: starta server (Spring Boot)**.

### Windows (utan container)

Dubbelklicka eller kör i PowerShell:

```powershell
cd yoenia-portfolio
.\start-local.ps1
```

Skriptet letar efter Java/Maven och visar `winget`-kommandon om något saknas. Med Maven Wrapper:

```powershell
.\mvnw.cmd spring-boot:run
```

(Kräver Java 21 installerat, t.ex. `winget install Microsoft.OpenJDK.21`.)

Öppna [http://localhost:8080](http://localhost:8080)

## API

| Metod | Sökväg | Beskrivning |
|--------|--------|-------------|
| GET | `/api/profile` | Profil, erfarenhet, utbildning och projekt (JSON) |
| POST | `/api/contact` | Kontaktformulär (`name`, `email`, `message`) |

## Publicera på yoenia.se

1. Bygg JAR: `mvn -DskipTests package`
2. Kör på server: `java -jar target/yoenia-portfolio-1.0.0.jar`
3. Peka domänen `yoenia.se` mot servern (reverse proxy med nginx/Caddy rekommenderas för HTTPS).

Profiltext kan uppdateras i `ProfileService.java` utan att ändra HTML.

## Relaterat projekt

Examensarbete **LSS & självbestämmande** finns i mappen [`../lss-sjalvbestammande`](../lss-sjalvbestammande).
