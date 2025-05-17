package com.main.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ChangePassDto implements Serializable {

    String currentPass;

    String newPass;

    String confirmPass;
}
