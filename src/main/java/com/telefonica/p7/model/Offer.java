package com.telefonica.p7.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Table("OFFER")
public class Offer {
    @Id
    private String id;

    private String offerName;
    private LocalDate dateBegining;
    private LocalDate dateEnd;
    private String offerDescription;
}