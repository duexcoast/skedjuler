package productdb

import (
	"fmt"

	"github.com/duexcoast/skedjuler/business/core/crud/product"
	"github.com/duexcoast/skedjuler/business/web/order"
)

var orderByFields = map[string]string{
	product.OrderByProductID: "product_id",
	product.OrderByUserID:    "user_id",
	product.OrderByName:      "name",
	product.OrderByCost:      "cost",
	product.OrderByQuantity:  "quantity",
}

func orderByClause(orderBy order.By) (string, error) {
	by, exists := orderByFields[orderBy.Field]
	if !exists {
		return "", fmt.Errorf("field %q does not exist", orderBy.Field)
	}

	return " ORDER BY " + by + " " + orderBy.Direction, nil
}
