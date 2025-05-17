package com.main.repository;

import com.main.entity.BannerWords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;


public interface BannerWordRepository extends JpaRepository<BannerWords, Integer> {
    List<BannerWords> findByWord(String word);
}
