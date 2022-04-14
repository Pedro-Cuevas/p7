package com.telefonica.p7.service;

import com.telefonica.p7.model.Offer;

public interface OfferService {
    Iterable<Offer> getOffer();
    /* Offer updateOffer(String id, Offer offer);
    void insertOffer(String id, Offer offer);
    void deleteOffer(String id);   */  
}
