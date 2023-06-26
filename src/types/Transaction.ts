export interface TransactionList {
  data: Transaction[]
}

export interface Transaction extends TransactionCreate{
  id: number,
}

export interface TransactionCreate {
  title: string,
  description: string,
  value: number,
  id_category: number
  id_account: number
}

// id = Column(Integer, primary_key=True, index=True)
// title = Column(String(150))
// description = Column(String(150))
// value = Column(Double)
// type = Column('type', Enum(Types))
// id_category = Column(Integer, ForeignKey("categories.id"), nullable=False)
// id_account = Column(Integer, ForeignKey("accounts.id"), nullable=False)