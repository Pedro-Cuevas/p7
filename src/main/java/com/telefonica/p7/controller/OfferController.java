package com.telefonica.p7.controller;

import com.telefonica.p7.model.Offer;
import com.telefonica.p7.service.OfferService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class OfferController {
    @Autowired
    private OfferService offerService;
    
    @GetMapping("/offers")
    public ResponseEntity<Iterable<Offer>> getOffers() {

        Iterable<Offer> response = offerService.getOffer();
        return ResponseEntity.ok().body(response);
    }
}
