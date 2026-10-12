package se.yoenia.portfolio.service;

import java.util.List;
import org.springframework.stereotype.Service;
import se.yoenia.portfolio.dto.EducationDto;
import se.yoenia.portfolio.dto.ExperienceDto;
import se.yoenia.portfolio.dto.LanguageDto;
import se.yoenia.portfolio.dto.ProfileDto;
import se.yoenia.portfolio.dto.ProjectDto;
import se.yoenia.portfolio.dto.SkillGroupDto;

@Service
public class ProfileService {

    public ProfileDto getProfile() {
        return new ProfileDto(
                "Yoenia Malmebo",
                "Verksamhetsledare / Samordnare inom social omsorg",
                "Struktur, kvalitet och människan i centrum",
                """
                Engagerad och lösningsorienterad samordnare med flerårig erfarenhet inom LSS,
                social omsorg och omvårdnad. Van vid bemanning, kvalitetssäkring, dokumentation
                och operativ samordning i verksamheter med höga krav på struktur, kontinuitet
                och professionalism. Har erfarenhet av arbetsledning och utvecklingsarbete —
                bland annat verktyget Rutinflödet och ny aktivitetsplanering som implementerats
                i flera verksamheter. Utvecklar även webb med Java, Spring Boot, HTML, CSS och JavaScript.
                """.trim(),
                "Bromma, Stockholm",
                "yoenia.malmebo@gmail.com",
                "070-713 36 37",
                "https://www.linkedin.com/in/yoenia-malmebo-806092274/",
                "https://yoenia.se",
                List.of(
                        "Engagerad",
                        "Lösningsorienterad",
                        "Strukturerad",
                        "Organisatorisk förmåga",
                        "Flexibel",
                        "Lagspelare",
                        "Problemlösning",
                        "Snabblärd"),
                List.of(
                        new SkillGroupDto(
                                "Ledning & samordning",
                                List.of(
                                        "Arbetsledning",
                                        "Bemanning",
                                        "Kvalitetssäkring",
                                        "Rutin- och processutveckling",
                                        "Operativ samordning",
                                        "Kontakt med externa parter")),
                        new SkillGroupDto(
                                "Vård, omsorg & LSS",
                                List.of(
                                        "Personcentrerad omsorg",
                                        "Funktionsnedsättning & psykiatri",
                                        "Medicinhantering",
                                        "Dokumentation Parasol",
                                        "Salutogent förhållningssätt",
                                        "Kultur- och fritidsarbete")),
                        new SkillGroupDto(
                                "Administration & system",
                                List.of(
                                        "Fakturering",
                                        "Inköp",
                                        "Agresso",
                                        "LISA",
                                        "Medvind",
                                        "Visma")),
                        new SkillGroupDto(
                                "Webb & utveckling",
                                List.of(
                                        "Java",
                                        "Spring Boot",
                                        "HTML5",
                                        "CSS3",
                                        "JavaScript",
                                        "REST API",
                                        "Git"))),
                List.of(
                        new ExperienceDto(
                                "Apr 2025 – Jun 2025",
                                "Tf. gruppledare – fyra LSS-verksamheter",
                                "Stockholms stad",
                                "Bromma",
                                List.of(
                                        "Ansvar för bemanning, kvalitet och struktur.",
                                        "Ledde arbetsgruppen utifrån salutogent synsätt.",
                                        "Säkerställde efterlevnad av lagar, riktlinjer och rutiner.",
                                        "Implementerade nya arbetsrutiner och processer.",
                                        "Utvecklade strategier för effektivitet och produktivitet.",
                                        "Kontaktperson mot externa samarbetspartners.")),
                        new ExperienceDto(
                                "Feb 2017 – pågående",
                                "Boendestödjare",
                                "Gruppbostad Annedal, Stockholms stad",
                                "Bromma",
                                List.of(
                                        "Ansvar för fakturering, inköp, bemanning, kvalitet och dokumentation.",
                                        "Skapade verktyget Rutinflödet och ny aktivitetsplanering — implementerat i flera verksamheter.",
                                        "Dokumentations- och kvalitetsombud; Parasol.",
                                        "Stödperson, kultur- och fritidsombud; bemanning i Medvind och Visma.")),
                        new ExperienceDto(
                                "Apr 2014 – Dec 2016",
                                "Vårdare",
                                "Gruppbostad Backlura, Nytida",
                                "Hässelby",
                                List.of(
                                        "Omvårdnad för personer med MS och förvärvad hjärnskada.",
                                        "Anpassade stödinsatser efter brukarens behov.",
                                        "Medicinering enligt rutiner.")),
                        new ExperienceDto(
                                "Maj 2006 – Jul 2013",
                                "Personlig assistent & hemtjänst",
                                "Bonitas AB",
                                "Stockholm",
                                List.of(
                                        "Stöd i dagliga aktiviteter för trygg vardag.",
                                        "Arbete med äldre och personer med funktionsnedsättning och psykiatriska diagnoser."))),
                List.of(
                        new EducationDto(
                                "Aug 2024 – Maj 2026",
                                "Verksamhetsledare / Samordnare inom social omsorg",
                                "Yrkeshögskola",
                                "Upplands-Bro",
                                List.of(
                                        "Pågående högskoleutbildning med fokus på ledning och samordning.")),
                        new EducationDto(
                                "Apr 2025 – Maj 2025",
                                "Gruppledarutbildning: Att leda utan att vara chef",
                                "Intern utbildning",
                                "Bromma",
                                List.of()),
                        new EducationDto(
                                "Aug 2016 – Dec 2019",
                                "Vård- och omsorgsprogrammet – hälso- och sjukvård",
                                "KUI",
                                "Fridhemsplan, Stockholm",
                                List.of(
                                        "Personcentrerad vård, etik, pedagogiskt ledarskap, rekrytering, psykiatri, palliativ vård.",
                                        "Två LIA-perioder i Sundbybergs stad.")),
                        new EducationDto(
                                "2018 – 2019",
                                "Neuropsykiatriska och intellektuella funktionsnedsättningar",
                                "KIND – Karolinska Institutet",
                                "Stockholm",
                                List.of()),
                        new EducationDto(
                                "2021",
                                "Specialpedagogik 2",
                                "KUI",
                                "",
                                List.of()),
                        new EducationDto(
                                "Apr 2024 – Maj 2024",
                                "Psykologi 1",
                                "CUBUS",
                                "Fridhemsplan",
                                List.of())),
                List.of(
                        new LanguageDto("Svenska", "Flytande (C2)"),
                        new LanguageDto("Spanska", "Flytande (C2)"),
                        new LanguageDto("Engelska", "Medelnivå (B1)")),
                List.of(
                        new ProjectDto(
                                "LSS & självbestämmande",
                                """
                                Examensarbete: webbapp med enkät och visualisering av faktorer som påverkar
                                självbestämmande i gruppbostad enligt LSS. Byggd med Spring Boot, H2, HTML, CSS och JavaScript.
                                """.trim(),
                                List.of("Java", "Spring Boot", "JavaScript", "HTML", "CSS", "REST"),
                                "Läs mer",
                                "#projekt-lss"),
                        new ProjectDto(
                                "yoenia.se",
                                """
                                Denna portfölj: responsiv sajt med profil-data från Spring Boot REST API
                                och kontaktformulär med server-side validering.
                                """.trim(),
                                List.of("Java", "Spring Boot", "JavaScript", "HTML", "CSS"),
                                "",
                                "")));
    }
}
