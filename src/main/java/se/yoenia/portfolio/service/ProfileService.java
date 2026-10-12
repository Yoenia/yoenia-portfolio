package se.yoenia.portfolio.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.stereotype.Service;
import se.yoenia.portfolio.dto.ProfileDto;

@Service
public class ProfileService {

    private final ObjectMapper objectMapper;

    public ProfileService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public ProfileDto getProfile() {
        try (InputStream in = getClass().getResourceAsStream("/static/data/profile.json")) {
            if (in == null) {
                throw new IllegalStateException("Profilfilen saknas");
            }
            return objectMapper.readValue(in, ProfileDto.class);
        } catch (IOException e) {
            throw new IllegalStateException("Kunde inte läsa profilen", e);
        }
    }
}
