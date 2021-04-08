package com.ssafy.petstory.member.dto;

import com.ssafy.petstory.board.domain.Board;
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
