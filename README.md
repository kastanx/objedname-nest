1. Jak vytvoříte nový modul v NestJS? Jaké jsou výhody
   použití modulů v aplikaci?

nest generate module (module_name) nebo ručně.
Rozdělují aplikaci do logických a menších částí a mohou se znovu použít.

2. Co jsou middleware v NestJS a jak se liší od middleware v
   jiných frameworkách? Kdy byste použili middleware v
   aplikaci?

Middleware se vykonává těsně před tím než request dojde do controlleru. Nejčastější použití je pro autentikaci a logování.
Middleware můžu aplikovat na určitý modul nebo cestu.

3. Co jsou to namespacy v PHP a jak využívají autoloading?
   Jak může autoloading zjednodušit práci s velkými kódy?

Díky namespacům můžu oddělit a zorganizovat classy a předejít konfliktům při pojmenování.
Autoloading pomáhá v tom že není třeba používat require nebo include.

4. Jaký je rozdíl mezi Guards a Interceptors v NestJS? Jak
   byste použili Guards a Interceptors k zajištění bezpečnosti
   a logování ve vaší aplikaci?

Guards v NestJS kontrolují oprávnění k přístupu k rousourcům, zatímco Interceptors modifikují požadavky nebo odpovědi.
Guards použijete k ochraně endpointů, Interceptors zase k logování a transformaci dat.

5. Vysvětlete rozdíl mezi == a === v PHP. Kdy byste měli
   použít každý z těchto operátorů?

== porovnává hodnoty bez ohledu na typ, zatímco === vyžaduje, aby se shodoval typ i hodnota.
== použijte, pokud potřebujete porovnat hodnoty různého typu
=== pro striktní porovnání.

6. Jak funguje systém Dependency Injection v NestJS? Jak
   může DI zjednodušit testování a správu závislostí v
   aplikaci?

DI v NestJS automaticky poskytuje classám jejich závislosti. DI zjednodušuje testování pomocí snadného nahrazování závislostí mockovanými objekty a zlepšuje organizaci kódu.

7. Vysvětlete rozdíl mezi trait a interface v PHP. Kdy byste
   použili trait a kdy byste použili interface?

Trait v PHP sdílí konkrétní metody mezi třídami, zatímco Interface definuje rozhraní, které musí třídy implementovat.
Trait použijte ke sdílení kódu, Interface k definování kontraktů pro různé třídy.

8. Co je to DTO a jaký je jeho účel v NestJS? Jak byste použili
   DTO k validaci a transformaci dat v příchozích a odchozích
   HTTP požadavcích?

Data Transfer Object slouží k přenosu dat v aplikaci, často se používá k validaci a transformaci dat v requestech. DTO umožňuje snadno definovat a ověřovat strukturu dat pomocí validátorů jako class-validator, které jsem využil v řešení tohoto zadání.

9. Jak fungují sessions a cookies v PHP? Jak můžete v PHP
   pracovat s sessions a jak zajistíte bezpečnost při práci s
   cookies?

Session vytvoří u klienta cookie s identifikátorem a na straně serveru ukládá data. Browser cookies posílá automaticky v každém requestu takže si pak PHP může spárovat data.

11. Co jsou to dekorátory? K čemu slouží? Lze je použít ve
    Vanilla JS?

Dekorátor je funkce která se aplikuje na třidu/metodu/atribut a upravuje jejich chování. ve Vanilla JS jde myslím jen s Babelem.

12. Co je to TypeScript, jaké má výhody a nevýhody oproti
    Vanilla JS?

Nadstavba Javasriptu která přidává statické typy a jiné důležité funkce.
Výhodou je lepší čitelnost a typová bezpečnost.
Nevýhodu možná vidím v tom že ne všechny knihovny mají kvalitní typové definice, někdy s tím bývá problém.
