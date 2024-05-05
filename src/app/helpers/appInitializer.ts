import { AccountService } from "../service/account.service";


export function appInitializer(authService: AccountService) {
  return async () => {
    await authService.init();
  };
}
