var unicorn_vocabulary = {
	male: {
		start:		['Aer', 'An', 'Ar', 'Ban', 'Bar', 'Ber', 'Beth', 'Bett', 'Cut', 'Dan', 'Dar', 'Dell', 'Der', 'Edr', 'Er', 'Eth', 'Ett', 'Tosh', 'Fin', 'Ian', 'Iarr', 'Ill', 'Jed', 'Kan', 'Kar', 'Ker', 'Kurr', 'Kyr', 'Man', 'Mar', 'Mer', 'Moog', 'Morg', 'Mir', 'Tsal', 'Tser', 'Tsir', 'Van', 'Var', 'Yur', 'Yyr', 'King Ban', 'King Bar', 'King Ber', 'King Dan', 'King Dar', 'King Dell', 'King Fin', 'King Jed', 'King Kan', 'King Kar', 'King Ker', 'King Kurr', 'King Moog', 'King Morg', 'King Van', 'Prince Ban', 'Prince Bar', 'Prince Ber', 'Prince Dan', 'Prince Dar', 'Prince Dell', 'Prince Fin', 'Prince Jed', 'Prince Kan', 'Prince Kar', 'Prince Ker', 'Prince Kurr', 'Prince Moog', 'Prince Morg', 'Prince Van', 'Emporer Ban', 'Emporer Bar', 'Emporer Ber', 'Emporer Dan', 'Emporer Dar', 'Emporer Dell', 'Emporer Fin', 'Emporer Jed', 'Emporer Kan', 'Emporer Kar', 'Emporer Ker', 'Emporer Kurr', 'Emporer Moog', 'Emporer Morg', 'Emporer Van', 'Ambassador Ban', 'Ambassador Bar', 'Ambassador Ber', 'Ambassador Dan', 'Ambassador Dar', 'Ambassador Dell', 'Ambassador Fin', 'Ambassador Jed', 'Ambassador Kan', 'Ambassador Kar', 'Ambassador Ker', 'Ambassador Kurr', 'Ambassador Moog', 'Ambassador Morg', 'Ambassador Van', 'Chancellor Ban', 'Chancellor Bar', 'Chancellor Ber', 'Chancellor Dan', 'Chancellor Dar', 'Chancellor Dell', 'Chancellor Fin', 'Chancellor Jed', 'Chancellor Kan', 'Chancellor Kar', 'Chancellor Ker', 'Chancellor Kurr', 'Chancellor Moog', 'Chancellor Morg', 'Chancellor Van', 'JP Ban', 'JP Bar', 'JP Ber', 'JP Dan', 'JP Dar', 'JP Dell', 'JP Fin', 'JP Jed', 'JP Kan', 'JP Kar', 'JP Ker', 'JP Kurr', 'JP Moog', 'JP Morg', 'JP Van'],
		middle:		['al', 'an', 'ar', 'el', 'en', 'ess', 'ian', 'onn', 'or'],
		end:		['ai', 'an', 'ar', 'ath', 'en', 'eo', 'ian', 'is', 'u', 'or'],
		title:		['The Feared', 'The Immutable', 'The Cruel', 'The Hated', 'Prime', 'The Second', 'The Third', 'of Stanley', 'of Morgan', 'of Lynch', 'of Merrill', 'of Winkilvi', 'of Horowitz', 'The Bloody'],
		illegal: 	['orar', 'arrar'],
		rule: 		'$start$50$middle$end$_$title'
	},
	female: {
		start:		['Aer', 'An', 'Ar', 'Ban', 'Bar', 'Bl', 'Ber', 'Beth', 'Bett', 'Cut', 'Dan', 'Dar', 'Dell', 'Der', 'Edr', 'Er', 'Eth', 'Ett', 'Fin', 'Ian', 'Iarr', 'Ill', 'Jed', 'Kan', 'Kar', 'Ker', 'Kurr', 'Kyr', 'Man', 'Mar', 'Mer', 'Mir', 'Tsal', 'Tser', 'Tsir', 'Van', 'Var', 'Yur', 'Yyr'],
		middle:		['al', 'yth', 'an', 'ar', 'el', 'en', 'ess', 'ian', 'onn', 'or'],
		end:		['a of Morgana', 'ae of Morgana', 'aelle of Morgana', 'ai of Morgana', 'ea of Morgana', 'e of Morgana', 'ia of Morgana', 'u of Morgana', 'wen of Morgana', 'wyn of Morgana', 'a', 'ae', 'aelle', 'ai', 'ea', 'i', 'ia', 'u', 'wen', 'wyn', 'a of Blythe', 'ae of Blythe', 'aelle of Blythe', 'ai of Blythe', 'ea of Blythe', 'i of Blythe', 'ia of Blythe', 'u of Blythe', 'wen of Blythe', 'wyn of Blythe', 'a of Genesis Prime', 'ae of Genesis Prime', 'aelle of Genesis Prime', 'ai of Genesis Prime', 'ea of Genesis Prime', 'i of Genesis Prime', 'ia of Genesis Prime', 'u of Genesis Prime', 'wen of Genesis Prime', 'wyn of Genesis Prime'],
		title:		['The Beautiful', 'The Kind', 'The Fair', 'Lady', 'Princess', 'Queen', 'Emperess', 'Ambassador'],
		illegal: 	['arrar'],
		rule: 		'50$title$_$start$50$middle$end'
	}
}