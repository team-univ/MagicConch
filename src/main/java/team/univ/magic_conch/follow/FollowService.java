package team.univ.magic_conch.follow;

import team.univ.magic_conch.follow.dto.BestFollowerDTO;
import team.univ.magic_conch.user.User;
import team.univ.magic_conch.user.dto.UserSimpleDTO;

import java.util.List;

public interface FollowService {

    /**
     * 팔로우
     * @param userFrom
     * @param userTo
     */
    public Follow addFollow(User userFrom, User userTo);

    /**
     * 언팔로우
     * @param userFrom
     * @param userTo
     */
    public void deleteFollow(User userFrom, User userTo);

    /**
     * 내가 팔로우 한 사람들 목록
     * @param userFrom
     * @return List<SimpleUserDTO>
     */
    public List<UserSimpleDTO> findAllByUserFrom(User userFrom);

    /**
     * 나를 팔로우 한 사람들 목록
     * @param userTo
     * @return List<SimpleUserDTO>
     */
    public List<UserSimpleDTO> findAllByUserTo(User userTo);

    /**
     * 팔로우 중인지 확인
     * @param userFrom 본인
     * @param userTo   대상
     * @return true : 팔로우 중, false : 팔로우 중 아님
     */
    boolean isFollowed(User userFrom, User userTo);

    /**
     * 팔로우가 가장 많은 5명의 유저 데이터 전달
     * @return 팔로우가 가장 많은 5명을 담은 DTO 리스트
     */
    public List<BestFollowerDTO> findBestFollower();
}
