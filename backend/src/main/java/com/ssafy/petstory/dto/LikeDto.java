package com.ssafy.petstory.dto;

import com.ssafy.petstory.domain.Board;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class LikeDto {
    Board board;
    Long profileId;
}
