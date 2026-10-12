package se.yoenia.portfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import se.yoenia.portfolio.dto.ContactRequest;
import se.yoenia.portfolio.dto.ContactResponse;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    @Value("${portfolio.contact.log:true}")
    private boolean logMessages;

    public ContactResponse handle(ContactRequest request) {
        if (logMessages) {
            log.info(
                    "Kontakt från portföljen: name={}, email={}, messageLength={}",
                    request.name(),
                    request.email(),
                    request.message().length());
        }
        return new ContactResponse(
                true,
                "Tack för ditt meddelande! Jag återkommer så snart jag kan.");
    }
}
