package commands

import (
	"context"
	"fmt"
	"net/mail"
	"time"

	"github.com/duexcoast/skedjuler/business/core/crud/user"
	"github.com/duexcoast/skedjuler/business/core/crud/user/stores/userdb"
	"github.com/duexcoast/skedjuler/business/data/sqldb"
	"github.com/duexcoast/skedjuler/foundation/logger"
)

// UserAdd adds new users into the database.
func UserAdd(log *logger.Logger, cfg sqldb.Config, name, email, password string) error {
	if name == "" || email == "" || password == "" {
		fmt.Println("help: useradd <name> <email> <password>")
		return ErrHelp
	}

	db, err := sqldb.Open(cfg)
	if err != nil {
		return fmt.Errorf("connect database: %w", err)
	}
	defer db.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	core := user.NewCore(log, nil, userdb.NewStore(log, db))

	addr, err := mail.ParseAddress(email)
	if err != nil {
		return fmt.Errorf("parsing email: %w", err)
	}

	nu := user.NewUser{
		Name:            name,
		Email:           *addr,
		Password:        password,
		PasswordConfirm: password,
		SystemRoles:     []user.SystemRole{user.RoleAdmin, user.RoleUser},
	}

	usr, err := core.Create(ctx, nu)
	if err != nil {
		return fmt.Errorf("create user: %w", err)
	}

	fmt.Println("user id:", usr.Id)
	return nil
}
