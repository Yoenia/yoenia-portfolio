package se.yoenia.portfolio.dto;

import java.util.List;

public record ProfileDto(
        String name,
        String title,
        String tagline,
        String summary,
        String location,
        String email,
        String phone,
        String linkedInUrl,
        String siteUrl,
        List<String> strengths,
        List<SkillGroupDto> skillGroups,
        List<ExperienceDto> experience,
        List<EducationDto> education,
        List<LanguageDto> languages,
        List<ProjectDto> projects
) {}
