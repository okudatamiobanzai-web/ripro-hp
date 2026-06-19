/* RiPRO 対応品目データ — HPとピッカー両方から参照される単一ソース */
window.RIPRO_ITEMS = [
  {
    "id": "item-wrap",
    "name": "ラップフィルム・シート類",
    "category": "軟プラ類",
    "price": "66円/kg",
    "free": false,
    "subitems": [
      {
        "image": "candidates/ラップ_2.jpg",
        "label": "ラップフィルム",
        "desc": "",
        "note": "ラップでネットや緩い紐を包まないようにお願いします。ラップを丸めて縛ることもやめてください。"
      },
      {
        "image": "candidates/ブルーシート4.jpg",
        "label": "ブルーシート（スタックシート）",
        "desc": "使用済みのブルーシート・防水シート。サイズが大きい場合は2×10m程度に切断してお出しいただけると回収がスムーズです。",
        "note": "大きいまま出すと土や草が混ざり重量が増えるので、切断し付着物を落とすことをおすすめします。"
      },
      {
        "image": "candidates/フレコンバック.jpg",
        "label": "フレコンバッグ",
        "desc": "肥料・飼料・ペレット等で使用したフレコンバッグ。中身を空にしてお出しください。複数枚は重ねて畳むと省スペースです。"
      },
      {
        "image": "candidates/紙プラ.jpg",
        "label": "紙プラ",
        "desc": "袋内側に防水フィルムがあるものは紙ではなく、プラスチック類となります。",
        "note": "紙プラは他のものとは別にしてください。単体で袋詰めをお願いします。"
      }
    ]
  },
  {
    "id": "item-tire",
    "name": "バケツ、ポリ容器、デッピングタンク等",
    "category": "硬プラ類",
    "price": "99円/kg",
    "free": false,
    "commonNote": "タンク類は洗浄し、残液が残らない様にしてください。",
    "subitems": [
      {
        "image": "candidates/バケツ、ポリ容器.jpg",
        "label": "バケツ、ポリ容器",
        "desc": ""
      },
      {
        "image": "candidates/硬プラ_01.jpeg",
        "label": "デッピングタンク",
        "desc": ""
      },
      {
        "image": "images/蟻酸タンク青.jpg",
        "label": "蟻酸タンク",
        "desc": ""
      },
      {
        "image": "candidates/プラ容器類.jpg",
        "label": "プラ容器類",
        "desc": ""
      },
      {
        "image": "candidates/プラスチックスコップ.jpg",
        "label": "プラスチックスコップ",
        "desc": "",
        "note": "スコップの柄が木製または鉄製の部分がある場合は取り外してください。取り外していないものは混合廃棄物となります。"
      }
    ]
  },
  {
    "id": "item-hardplastic",
    "name": "塩ビシート・パイプ",
    "category": "塩ビ類",
    "price": "132円/kg",
    "free": false,
    "commonNote": "塩ビ類は他の品目と混ぜず、単体で袋詰めしてください。塩ビシートと作業用前掛けは一緒の袋に入れていただいてOKです。",
    "subitems": [
      {
        "image": "candidates/塩ビパイプ.jpg",
        "label": "塩ビパイプ（硬質）",
        "desc": ""
      },
      {
        "image": "candidates/塩ビシート.jpg",
        "label": "塩ビシート",
        "desc": ""
      },
      {
        "image": "candidates/作業用前掛け.jpg",
        "label": "作業用前掛け",
        "desc": ""
      }
    ]
  },
  {
    "id": "item-rubber",
    "name": "木製パレット・梱包用木材",
    "category": "木くず類",
    "price": "66円/kg",
    "free": false,
    "subitems": [
      {
        "image": "candidates/木製パレット.jpg",
        "label": "木製パレット・梱包用木材",
        "desc": "",
        "note": "防腐剤、コールタール付き木材は混合廃棄物になります。他の木くずとは別に仕分けしてください。"
      },
      {
        "image": "candidates/たけ箒.jpg",
        "label": "竹ほうき",
        "desc": ""
      }
    ]
  },
  {
    "id": "item-wood",
    "name": "FRP製一輪車・子牛用ハッチ",
    "category": "FRP類",
    "price": "198円/kg",
    "free": false,
    "subitems": [
      {
        "image": "candidates/FRP製一輪車.jpg",
        "label": "FRP製一輪車",
        "desc": "",
        "note": "取手の部分の鉄、タイヤは極力取り外してください。取り外しされていない物も回収いたしますが総重量にて計測し、FRP価格でご請求させて頂きますのでご了承ください。"
      },
      {
        "image": "candidates/子牛用ハッチ.jpg",
        "label": "子牛用ハッチ",
        "desc": ""
      }
    ]
  },
  {
    "id": "item-vinyl",
    "name": "発泡スチロール・スタイロフォーム",
    "category": "発泡スチロール・スタイロフォーム",
    "price": "330円/kg",
    "free": false,
    "commonNote": "それぞれ単体で袋詰めしてください。大きいものは割って袋詰めしてください。",
    "subitems": [
      {
        "image": "images/発泡スチロール.jpg",
        "label": "発泡スチロール",
        "desc": ""
      },
      {
        "image": "candidates/スタイロフォーム.jpg",
        "label": "スタイロフォーム",
        "desc": ""
      }
    ]
  },
  {
    "id": "item-foam",
    "name": "混合廃棄物",
    "category": "混合廃棄物",
    "price": "132円/kg",
    "free": false,
    "commonNote": "品目問わず複数混入しているものは混合廃棄物となります。塩ビ類・スタイロフォームは混合廃棄物にも混入できません。",
    "subitems": [
      {
        "image": "candidates/皮バンド.jpg",
        "label": "革バンド",
        "desc": ""
      },
      {
        "image": "candidates/ブラシ.jpg",
        "label": "ブラシ",
        "desc": ""
      },
      {
        "image": "candidates/麻ロープ.jpg",
        "label": "麻ロープ",
        "desc": "",
        "note": "ビニール系のロープは軟プラとなります。"
      },
      {
        "image": "candidates/電牧ロープ.jpg",
        "label": "電牧ロープ",
        "desc": ""
      },
      {
        "image": "candidates/乳紙フィルター.jpg",
        "label": "乳紙フィルター",
        "desc": ""
      },
      {
        "image": "candidates/使用済み牛床マット.jpg",
        "label": "使用済牛床マット",
        "desc": "",
        "note": "未使用はゴムとなります。"
      }
    ]
  },
  {
    "id": "item-metal",
    "name": "ゴム類",
    "category": "ゴム",
    "price": "99円/kg",
    "free": false,
    "commonNote": "ホース類は、金具がついているものは混合廃棄物となります。ゴム素材単体で袋詰めしてください。",
    "subitems": [
      {
        "image": "candidates/ライナーゴム.jpg",
        "label": "ライナーゴム",
        "desc": ""
      },
      {
        "image": "candidates/ゴム手袋.jpg",
        "label": "ゴム手袋",
        "desc": ""
      },
      {
        "image": "candidates/長靴.jpg",
        "label": "長靴",
        "desc": ""
      },
      {
        "image": "candidates/ニトリル手袋.jpg",
        "label": "ニトリル手袋",
        "desc": ""
      },
      {
        "image": "candidates/シリコンホース.jpg",
        "label": "シリコンホース",
        "desc": ""
      },
      {
        "image": "candidates/ゴムホース.jpg",
        "label": "ゴムホース",
        "desc": ""
      }
    ]
  },
  {
    "id": "item-mixed",
    "name": "金属くず",
    "category": "金属",
    "price": "1t未満 0円回収 / 1t以上 有価買取",
    "free": true,
    "subitems": [
      {
        "image": "candidates/金属クズ.jpg",
        "label": "金属くず",
        "desc": "1t未満は無料回収、1t以上は有価買取でご相談承ります。"
      }
    ]
  },
  {
    "id": "item-paper",
    "name": "段ボール・紙類",
    "category": "木・紙",
    "price": "0円回収",
    "free": true,
    "subitems": [
      {
        "image": "assets/placeholder.svg",
        "label": "段ボール",
        "desc": "畳んだ状態で紐で縛ってお出しください。量が多い場合はフレコンバッグに入れていただいてもOKです。"
      },
      {
        "image": "assets/placeholder.svg",
        "label": "新聞紙",
        "desc": "量が多い場合はフレコンバッグに入れていただいてもOKです。"
      },
      {
        "image": "assets/placeholder.svg",
        "label": "紙袋",
        "desc": ""
      },
      {
        "image": "assets/placeholder.svg",
        "label": "ラップ芯",
        "desc": ""
      },
      {
        "image": "assets/placeholder.svg",
        "label": "飼料袋（紙質）",
        "desc": ""
      },
      {
        "image": "assets/placeholder.svg",
        "label": "肥料袋（紙質）",
        "desc": ""
      }
    ]
  },
  {
    "id": "item-machine",
    "name": "機械部品",
    "category": "機械部品",
    "price": "有価買取",
    "free": false,
    "subitems": [
      {
        "image": "candidates/廃自動車.jpg",
        "label": "廃自動車",
        "desc": ""
      },
      {
        "image": "candidates/廃農機具.jpg",
        "label": "廃農機具",
        "desc": ""
      }
    ]
  },
  {
    "id": "item-appliance",
    "name": "家電製品",
    "category": "家電製品",
    "price": "リサイクル料金＋収集運搬料 1台 3,300円〜",
    "free": false,
    "commonDesc": "リサイクル券はリプロでご用意します。料金は、家電リサイクル券センターのリサイクル料金（品目ごとに異なります）に、リプロの収集運搬料として1台目 3,300円／2台目以降 1台 1,100円を加えた金額です。詳しくはお問い合わせください。",
    "subitems": [
      {
        "image": "assets/placeholder.svg",
        "label": "洗濯機",
        "desc": ""
      },
      {
        "image": "assets/placeholder.svg",
        "label": "冷蔵庫",
        "desc": ""
      },
      {
        "image": "assets/placeholder.svg",
        "label": "テレビ",
        "desc": ""
      }
    ]
  },
  {
    "id": "item-tires",
    "name": "タイヤ",
    "category": "ゴム・タイヤ",
    "price": "99〜132円/kg",
    "free": false,
    "subitems": [
      {
        "image": "assets/placeholder.svg",
        "label": "廃タイヤ",
        "desc": "普通車・軽トラサイズ。",
        "note": "99円/kg"
      },
      {
        "image": "assets/placeholder.svg",
        "label": "廃タイヤ（大型車・トラクター）",
        "desc": "トラクター・大型作業車のタイヤ。",
        "note": "132円/kg"
      }
    ]
  }
];
