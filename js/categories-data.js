/* RiPRO カテゴリデータ — HPカテゴリカード（写真フル背景）の単一ソース
 * image: カードの背景写真。candidates/ 配下のファイル名を指定。
 * 変更したい場合は image のパスだけ書き換えればOK。
 */
window.RIPRO_CATEGORIES = [
  {
    id: 'cat-plastic',
    name: 'プラスチック類',
    summary: 'ラップ・硬プラ・塩ビ系シート/パイプ',
    priceRange: '¥66〜132 / kg',
    image: 'candidates/ラップ_2.jpg',
    itemIds: ['item-wrap', 'item-tire', 'item-hardplastic'],
  },
  {
    id: 'cat-rubber',
    name: 'ゴム・タイヤ',
    summary: 'タイヤ各種・ゴム類',
    priceRange: '¥99〜132 / kg',
    image: 'candidates/ハイタイヤ.jpg',
    itemIds: ['item-metal', 'item-tires'],
  },
  {
    id: 'cat-wood',
    name: '木材・紙類',
    summary: '木製パレット・梱包用木材・段ボール・紙類',
    priceRange: '0円回収〜¥66 / kg',
    image: 'candidates/木製パレット_01.jpeg',
    itemIds: ['item-rubber', 'item-paper'],
    free: true,
  },
  {
    id: 'cat-foam',
    name: '発泡・FRP',
    summary: '発泡スチロール・スタイロフォーム・FRP製一輪車・子牛用ハッチ',
    priceRange: '¥198〜330 / kg',
    image: 'candidates/スタイロフォーム.jpg',
    itemIds: ['item-vinyl', 'item-wood'],
  },
  {
    id: 'cat-mixed',
    name: '混合・家電',
    summary: '混合廃棄物・家電製品',
    priceRange: '¥132〜 / 個別お見積り',
    image: 'candidates/家電.jpg',
    itemIds: ['item-foam', 'item-appliance'],
  },
  {
    id: 'cat-metal',
    name: '金属・機械',
    summary: '金属くず・機械部品',
    priceRange: '0円回収〜有価買取',
    image: 'candidates/金属クズ.jpg',
    itemIds: ['item-mixed', 'item-machine'],
    free: true,
  },
];
