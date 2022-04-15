package com.telefonica.p7.service;

import com.telefonica.p7.model.Offer;

public interface OfferService {
    Iterable<Offer> getOffer();
    void deleteOffer(String id); 
    Offer insertOffer(Offer offer);
    /* Offer updateOffer(String id, Offer offer);
    */    
}
