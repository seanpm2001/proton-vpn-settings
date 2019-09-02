import React from 'react';
import PropTypes from 'prop-types';
import { c } from 'ttag';
import { Price } from 'react-components';
import { CYCLE, CURRENCIES } from 'proton-shared/lib/constants';

const PlanPrice = ({ plan, cycle, currency }) => {
    return (
        <div>
            <strong>{c('Plan price per month').jt`${(
                <Price currency={currency}>{plan.price.monthly}</Price>
            )} / mo`}</strong>
            <div>
                {cycle === CYCLE.MONTHLY
                    ? c('Plan price info monthly').jt`Charging you ${(
                          <Price currency={currency}>{plan.price.monthly}</Price>
                      )} monthly`
                    : c('Plan price info yearly').jt`Charging you ${(
                          <Price currency={currency}>{plan.price.total}</Price>
                      )} yearly`}
                {plan.price.saved > 0 && (
                    <strong>{c('Plan price yearly savings').jt`save ${(
                        <Price currency={currency}>{plan.price.saved}</Price>
                    )}`}</strong>
                )}
            </div>
        </div>
    );
};

PlanPrice.propTypes = {
    cycle: PropTypes.oneOf([CYCLE.MONTHLY, CYCLE.TWO_YEARS, CYCLE.YEARLY]).isRequired,
    currency: PropTypes.oneOf(CURRENCIES).isRequired,
    plan: PropTypes.shape({
        price: PropTypes.shape({
            monthly: PropTypes.number,
            total: PropTypes.number,
            saved: PropTypes.number
        }).isRequired
    }).isRequired
};

export default PlanPrice;