package com.main.utils;

import java.math.BigDecimal;
import java.text.DecimalFormat;

public class ReplaceUtils {

    public static BigDecimal replacePrice(String priceString) {
        try {
            String cleanedPriceString = priceString.replaceAll("[^\\d.]", "");
            return new BigDecimal(cleanedPriceString);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public static String formatPrice(BigDecimal price) {
        DecimalFormat decimalFormat = new DecimalFormat("###,###");
        return decimalFormat.format(price);
    }

    public static String removeTwoZerosFromString(String totalPriceString) {
        try {
            int totalPrice = Integer.parseInt(totalPriceString);
            int modifiedPrice = totalPrice / 100;
            return String.valueOf(modifiedPrice);
        } catch (NumberFormatException e) {
            return "Invalid input";
        }
    }
}
