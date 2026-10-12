package se.yoenia.portfolio.dto;

import java.util.List;

public record EducationDto(
        String period,
        String title,
        String institution,
        String location,
        List<String> details
) {}
