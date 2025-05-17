package com.main.service.impl;

import com.main.entity.BannerWords;
import com.main.repository.BannerWordRepository;
import com.main.service.BannerWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BannerWordServiceImpl implements BannerWordService {
    @Autowired
    BannerWordRepository bannerWordRepository;
    @Override
    public List<BannerWords> findAll() {
        return bannerWordRepository.findAll();
    }

    @Override
    public Optional<BannerWords> findById(Integer id) {
        return bannerWordRepository.findById(id);
    }

    @Override
    public List<BannerWords> findByWord(String word) {
        return bannerWordRepository.findByWord(word);
    }

    @Override
    public void save(BannerWords bannerWords) {
        bannerWordRepository.save(bannerWords);
    }

    @Override
    public void delete(BannerWords bannerWords) {
        bannerWordRepository.delete(bannerWords);
    }
}
