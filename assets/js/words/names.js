var unicorn_vocabulary = {
	male: {
		start:		['Aer', 'An', 'Ar', 'Ban', 'Bar', 'Ber', 'Beth', 'Bett', 'Cut', 'Dan', 'Dar', 'Dell', 'Der', 'Edr', 'Er', 'Eth', 'Ett', 'Fin', 'Ian', 'Iarr', 'Ill', 'Jed', 'Kan', 'Kar', 'Ker', 'Kurr', 'Kyr', 'Man', 'Mar', 'Mer', 'Mir', 'Tsal', 'Tser', 'Tsir', 'Van', 'Var', 'Yur', 'Yyr', 'King Ban', 'King Bar', 'King Ber', 'King Dan', 'King Dar', 'King Dell', 'King Fin', 'King Jed', 'King Kan', 'King Kar', 'King Ker', 'King Kurr', 'King Van', 'Prince Ban', 'Prince Bar', 'Prince Ber', 'Prince Dan', 'Prince Dar', 'Prince Dell', 'Prince Fin', 'Prince Jed', 'Prince Kan', 'Prince Kar', 'Prince Ker', 'Prince Kurr', 'Prince Van', 'Emporer Ban', 'Emporer Bar', 'Emporer Ber', 'Emporer Dan', 'Emporer Dar', 'Emporer Dell', 'Emporer Fin', 'Emporer Jed', 'Emporer Kan', 'Emporer Kar', 'Emporer Ker', 'Emporer Kurr', 'Emporer Van'],
		middle:		['al', 'an', 'ar', 'el', 'en', 'ess', 'ian', 'onn', 'or'],
		end:		['ai', 'an', 'ar', 'ath', 'en', 'eo', 'ian', 'is', 'u', 'or'],
		title:		['The Feared', 'The Bloody', 'The Cruel', 'The Hated', 'Prime', 'The Second', 'The Third'],
		illegal: 	['orar', 'arrar'],
		rule: 		'$start$50$middle$end$_$title'
	},
	female: {
		start:		['Aer', 'An', 'Ar', 'Ban', 'Bar', 'Ber', 'Beth', 'Bett', 'Cut', 'Dan', 'Dar', 'Dell', 'Der', 'Edr', 'Er', 'Eth', 'Ett', 'Fin', 'Ian', 'Iarr', 'Ill', 'Jed', 'Kan', 'Kar', 'Ker', 'Kurr', 'Kyr', 'Man', 'Mar', 'Mer', 'Mir', 'Tsal', 'Tser', 'Tsir', 'Van', 'Var', 'Yur', 'Yyr'],
		middle:		['al', 'an', 'ar', 'el', 'en', 'ess', 'ian', 'onn', 'or'],
		end:		['a', 'ae', 'aelle', 'ai', 'ea', 'i', 'ia', 'u', 'wen', 'wyn'],
		title:		['The Beautiful', 'Kind', 'Fair', 'Lady', 'Princess', 'Queen', 'Emperess'],
		illegal: 	['arrar'],
		rule: 		'$title$_$start$50$middle$end'
	}
}