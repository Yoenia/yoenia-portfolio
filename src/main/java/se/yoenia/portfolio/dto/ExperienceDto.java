package se.yoenia.portfolio.dto;

import java.util.List;

public record ExperienceDto(
        String period,
        String role,
        String organization,
        String location,
        List<String> highlights
) {}
