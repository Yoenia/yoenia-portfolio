package se.yoenia.portfolio.web;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.yoenia.portfolio.dto.ContactRequest;
import se.yoenia.portfolio.dto.ContactResponse;
import se.yoenia.portfolio.dto.ProfileDto;
import se.yoenia.portfolio.service.ContactService;
import se.yoenia.portfolio.service.ProfileService;

@RestController
@RequestMapping("/api")
public class PortfolioApiController {

    private final ProfileService profileService;
    private final ContactService contactService;

    public PortfolioApiController(ProfileService profileService, ContactService contactService) {
        this.profileService = profileService;
        this.contactService = contactService;
    }

    @GetMapping("/profile")
    public ProfileDto profile() {
        return profileService.getProfile();
    }

    @PostMapping("/contact")
    public ContactResponse contact(@Valid @RequestBody ContactRequest request) {
        return contactService.handle(request);
    }
}
