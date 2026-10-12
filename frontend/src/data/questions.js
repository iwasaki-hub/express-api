export const questions = [
  {
    id: "journal-001",
    category: "商品売買",
    difficulty: "初級",
    question: "商品10,000円を現金で仕入れた。",
    debit: "仕入",
    credit: "現金",
    amount: 10000,
    explanation:
      "商品を仕入れたときは「仕入」を借方に記入します。代金を現金で支払ったため、減少した「現金」を貸方に記入します。",
  },
  {
    id: "journal-002",
    category: "商品売買",
    difficulty: "初級",
    question: "商品20,000円を現金で販売した。",
    debit: "現金",
    credit: "売上",
    amount: 20000,
    explanation:
      "現金を受け取ったため、増加した「現金」を借方に記入します。商品を販売した収益は「売上」として貸方に記入します。",
  },
  {
    id: "journal-003",
    category: "費用",
    difficulty: "初級",
    question: "事務用品3,000円を現金で購入した。",
    debit: "消耗品費",
    credit: "現金",
    amount: 3000,
    explanation:
      "事務用品の購入を費用として処理し、「消耗品費」を借方に記入します。現金が減少するため「現金」を貸方に記入します。",
  },
  {
    id: "journal-004",
    category: "債権・債務",
    difficulty: "初級",
    question: "取引先に商品15,000円を掛けで販売した。",
    debit: "売掛金",
    credit: "売上",
    amount: 15000,
    explanation:
      "掛けで販売したため、後日代金を受け取る権利である「売掛金」を借方に記入します。販売による収益の「売上」を貸方に記入します。",
  },
  {
    id: "journal-005",
    category: "債権・債務",
    difficulty: "初級",
    question: "商品8,000円を掛けで仕入れた。",
    debit: "仕入",
    credit: "買掛金",
    amount: 8000,
    explanation:
      "商品を仕入れたため「仕入」を借方に記入します。代金を後日支払う義務が生じたため「買掛金」を貸方に記入します。",
  },
  {
    id: "journal-006",
    category: "債権・債務",
    difficulty: "初級",
    question: "売掛金12,000円を現金で回収した。",
    debit: "現金",
    credit: "売掛金",
    amount: 12000,
    explanation:
      "売掛金を回収して現金が増加したため「現金」を借方に記入します。回収した分だけ「売掛金」が減少するため、貸方に記入します。",
  },
  {
    id: "journal-007",
    category: "費用",
    difficulty: "初級",
    question: "従業員の給料25,000円を現金で支払った。",
    debit: "給料",
    credit: "現金",
    amount: 25000,
    explanation:
      "従業員の給料は費用なので「給料」を借方に記入します。現金を支払って減少したため「現金」を貸方に記入します。",
  },
  {
    id: "journal-008",
    category: "借入",
    difficulty: "初級",
    question: "銀行から現金50,000円を借り入れた。",
    debit: "現金",
    credit: "借入金",
    amount: 50000,
    explanation:
      "借入れによって現金が増加したため「現金」を借方に記入します。返済する義務である「借入金」が増加するため、貸方に記入します。",
  },
  {
    id: "journal-009",
    category: "固定資産",
    difficulty: "初級",
    question: "備品30,000円を現金で購入した。",
    debit: "備品",
    credit: "現金",
    amount: 30000,
    explanation:
      "備品を購入したため、資産である「備品」を借方に記入します。現金が減少するため「現金」を貸方に記入します。",
  },
  {
    id: "journal-010",
    category: "純資産",
    difficulty: "初級",
    question: "株主から出資を受け、現金100,000円を受け取った。",
    debit: "現金",
    credit: "資本金",
    amount: 100000,
    explanation:
      "出資を受けて現金が増加したため「現金」を借方に記入します。株主からの出資による「資本金」の増加を貸方に記入します。",
  },
];
