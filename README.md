# yoenia.se – personlig portfölj

Portfölj för **Yoenia Malmebo**: verksamhetsledare/samordnare inom social omsorg, med projekt i **Java**, **Spring Boot**, **HTML**, **CSS** och **JavaScript**.

## Köra lokalt

```bash
cd yoenia-portfolio
mvn spring-boot:run
```

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
