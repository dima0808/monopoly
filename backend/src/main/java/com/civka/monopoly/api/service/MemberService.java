package com.civka.monopoly.api.service;

import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.entity.Property;
import com.civka.monopoly.api.payload.DiceMessage;

public interface MemberService {

    Member save(Member member);

    void delete(Member member);

    void deleteById(Long id);

    DiceMessage rollDice(Member member);

    Property buyProperty(Member member, Integer position);

    Property payRent(Member member, Integer position);
}
