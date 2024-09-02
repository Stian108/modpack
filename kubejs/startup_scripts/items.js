ItemEvents.modification(event => {
    event.modify('overweight_farming:straw_hat', item => {
        item.setArmorProtection(0)
    })
    // TODO disable durability and enchantments
})