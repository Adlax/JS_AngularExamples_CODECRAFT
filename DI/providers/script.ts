import { ReflectiveInjector } from '@angular/core';
import { OpaqueToken } from '@angular/core';

// switching dependancies
{
	console.log("easy switch of dependancy");
	class MandrillService{};
	class SendGridService{};
	let injector = ReflectiveInjector.resolveAndcreate([
		{provide: "MailService", useClass: MandrillService}
	]);
	let mailService1 = injector.get(MailService);
	console.log(mailService1);
}

{
	injector.resolveAndCreate([
		{provide: "MailService", useClass: SendGridService}
	]);
	let mailService2 = injector.get(MailService);
	console.log(mailService2);
}

//useClass provider
{
	console.log("useClass provider");
	class MailService{};
	class MandrillService extends MailService;
	class SendGridService extends MailService;
	let injector = ReflectiveInjector.resolveAndCreate([
		{provide: MailService, useClass: SendGridService}
	]);
	let mailService = injector.get(MailService);
	console.log(mailService);
}

//useExisting
{
	console.log("aliases and useExisting");
	class MandrillService{};
	class SendGridService{};
	class GenericMailService{};
	let injector = ReflectiveInjector([
		{provide: MandrillService, useClass: GenericMailService},
		{provide: SendGridService, useExisting: GenericMailService},
		{provide: GenericMailService, useExisting: GenericMailService}

	]);
	let mailService1 = injector.get(MandrillService);
	let mailService2 = injector.get(SendGridService);
	let mailService3 = injector.get(GenericMailService);
	console.log(mailService1);
	console.log(mailService2);
	console.log(mailService3);
	console.log(mailService1 === mailService2 === mailService3);
}

//useValue
{
	console.log("useValue with read only object");
	let injector = ReflectiveInjector([
		{
			provide: "Config",
			useValue: Object.freeze({
				'APIKey': 'DJF45HJ',
				'APISecret': '456-567-370'

			})
		}
	]);
	let config = injector.get("Config");
	console.log(config);
}

//useFactory
{
	console.log("use factory");
	class MandrillService{};
	class SendGridService{};
	const prod = true;
	let injector = ReflectiveInjector.resolveAndCreate([
		{
			provide: MailService,
			useFactory: () => {
				if(prod) {
					return new MandrillService();
				} else {
					return new SendGridService();
				}
			}
		}
	]);
	let mailService = injector.get(MailService);
	console.log(mailService);
}
