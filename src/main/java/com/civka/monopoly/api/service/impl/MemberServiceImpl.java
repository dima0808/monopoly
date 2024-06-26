package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.repository.MemberRepository;
import com.civka.monopoly.api.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member save(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public void delete(Member member) {
        memberRepository.delete(member);
    }
}
