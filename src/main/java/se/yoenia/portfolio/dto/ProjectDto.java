package se.yoenia.portfolio.dto;

import java.util.List;

public record ProjectDto(
        String name,
        String description,
        List<String> tech,
        String linkLabel,
        String linkUrl
) {}
