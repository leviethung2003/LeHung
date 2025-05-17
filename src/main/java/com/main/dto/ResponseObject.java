package com.main.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResponseObject {
    private String status;
    private String message;
    private Object data;
}
