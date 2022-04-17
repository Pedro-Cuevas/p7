package com.telefonica.p7.repository;

import com.telefonica.p7.model.Offer;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface OfferRepository extends CrudRepository<Offer,String> {
    @Query("SELECT * FROM OFFER WHERE OFFER_AVAILABLE= :offerAvailable")
    public Iterable<Offer> getOffersAvailable(String offerAvailable);

    @Query("SELECT * FROM OFFER WHERE OFFER.ID= :id")
    public Iterable<Offer> getOfferByID(String id);
}

