package com.civka.monopoly.api.service;

import com.civka.monopoly.api.entity.Member;

public interface MemberService {

    Member save(Member member);

    void delete(Member member);

    void deleteById(Long id);
}
