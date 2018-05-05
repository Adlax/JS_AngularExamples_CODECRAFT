import { ReflectiveInjector } from '@angular/core';
import { InjectionToken } from '@angular/core';

//string tokens
{
  class MandrillService {};
  class SendGridService {};
  let injector = ReflectiveInjector.resolveAndCreate([
    { provide: "MailService", useClass: MandrillService }
  ]);
  let mailService = injector.get("MailService");
  console.log(mailService);
}

//class or type tokens
{
  class MailService {};
  class SendGridService extends MailService {};
  class MandrillService extends MailService {};
  let injector = ReflectiveInjector.resolveAndCreate([
    { provide: MailService, useClass: MandrillService }
  ]);
  let mailService = injector.get(MailService);
  console.log(mailService);
}

//InjectionToken use
{
  class MandrillService {};
  class SendGridService {};
  export const MandrillServiceToken = new InjectionToken<string>("MailService");
  export const SendGridServiceToken = new InjectionToken<string>("MailService");
  let injector = ReflectiveInjector.resolveAndCreate([
    { provide:  MandrillServiceToken, useClass: MandrillService },
    { provide: SendGridServiceToken, useClass: SendGridService },
  ]);
  let mailService1 = injector.get(MandrillServiceToken);
  let mailService2 = injector.get(SendGridServiceToken);
  console.log(mailService1 === mailService2);
}
