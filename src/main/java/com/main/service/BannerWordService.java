package com.main.service;

import com.main.entity.BannerWords;

import java.util.List;
import java.util.Optional;

public interface BannerWordService {
    List<BannerWords> findAll();

    Optional<BannerWords> findById(Integer id);

    List<BannerWords> findByWord(String word);
    void save(BannerWords bannerWords);

    void delete(BannerWords bannerWords);
}
