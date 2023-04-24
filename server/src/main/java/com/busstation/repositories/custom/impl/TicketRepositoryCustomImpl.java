package com.busstation.repositories.custom.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.busstation.common.Validate;
import com.busstation.entities.Ticket;
import com.busstation.repositories.custom.TicketRepositoryCustom;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Repository
public class TicketRepositoryCustomImpl implements TicketRepositoryCustom {
	@Autowired
	private EntityManager entityManager;

	@Override
	public Page<Ticket> searchTickets(String start, String end, Pageable pageable) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Ticket> query = cb.createQuery(Ticket.class);
		Root<Ticket> root = query.from(Ticket.class);
		List<Predicate> predList = new ArrayList<>();
		if (Validate.checkStringNotEmptyOrNull(start)) {
			predList.add(cb.like(root.get("addressStart"), start));
		}
		if (Validate.checkStringNotEmptyOrNull(end)) {
			predList.add(cb.like(root.get("addressEnd"), end));
		}

		Predicate[] predArray = new Predicate[predList.size()];
		predList.toArray(predArray);
		query.where(predArray);
		query.select(root);

		List<Ticket> typedQuery = entityManager.createQuery(query).setFirstResult((int) pageable.getOffset())
				.setMaxResults(pageable.getPageSize()).getResultList();
		Page<Ticket> tickets = new PageImpl<>(typedQuery, pageable, typedQuery.size());
		return tickets;
	}

}
