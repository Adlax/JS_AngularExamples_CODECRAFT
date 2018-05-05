import { ReflectiveInjector } from '@angular/core';
import { OpaqueToken } from '@angular/core'

<!-- simple injector example -->
{
	console.log("Simple injector example");
	class MandrillService{};
	class SendGridService{};
	let injector = ReflectiveInjector.resolveAndcreate([MandrillService,SendGridService]);
	let mailService = injector.get(MandrillService);
	console.log(mailService);
}

<!-- injector cache example -->
{
	console.log("example of cache");
	mailService1 = injector.get(MandrillService);
	mailService2 = injector.get(MandrillService);
	console.log(mailService1 === mailService2);
}

<-- injectors sharing state -->
{
	console.log("example of share");
	mailService1 = injector.get(MandrillService);
	mailService1.foo = "mooo";
	mailService2 = injector.get(MandrillService);
	console.log(mailService2.foo);
}

<-- child injector forward unresolution -->
{
	console.log("child injector forward unresolved dependancy");
	let injector = ReflectiveInjector.resolveAndCreate([MandrillService]);
	let childInjector = injector.resolveAndCreateChild([]);
	console.log(injector.get(MandrillService)===childinjector.get(MandrillService));
}

<-- child injector and father injector returns diffrent instances of dependancy -->
{
	console.log("diffrent injectors returns diffrent instances of dependancy");
	class mailservice{};
	class phoneService{};
	let injector = ReflectiveInjector.resolveAndCreate([mailService,phoneService]);
	let childInjector = injector.resolveAndCreateChild([mailService,phoneService]);
	console.log(injector.get(mailService)===childInjector.get(mailService));
}
