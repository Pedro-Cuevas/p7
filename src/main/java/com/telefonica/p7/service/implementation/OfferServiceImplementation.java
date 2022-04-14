package com.telefonica.p7.service.implementation;

import com.telefonica.p7.repository.OfferRepository;
import com.telefonica.p7.service.OfferService;
import com.telefonica.p7.model.Offer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OfferServiceImplementation implements OfferService{
    @Autowired
    private OfferRepository offerRepository;

    @Override
    public Iterable<Offer> getOffer(){
        return offerRepository.findAll();
    }
    
}
