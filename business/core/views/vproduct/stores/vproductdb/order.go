package vproductdb

import (
	"fmt"

	"github.com/duexcoast/skedjuler/business/core/views/vproduct"
	"github.com/duexcoast/skedjuler/business/web/order"
)

var orderByFields = map[string]string{
	vproduct.OrderByProductID: "product_id",
	vproduct.OrderByUserID:    "user_id",
	vproduct.OrderByName:      "name",
	vproduct.OrderByCost:      "cost",
	vproduct.OrderByQuantity:  "quantity",
	vproduct.OrderByUserName:  "user_name",
}

func orderByClause(orderBy order.By) (string, error) {
	by, exists := orderByFields[orderBy.Field]
	if !exists {
		return "", fmt.Errorf("field %q does not exist", orderBy.Field)
	}

	return " ORDER BY " + by + " " + orderBy.Direction, nil
}
