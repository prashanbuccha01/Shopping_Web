const CartItem = require("../models/Cart");
const jwt = require("jsonwebtoken");

// ADD A CART ITEM
exports.addCartItem = async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    const userId = req.user._id;

    let cartItem = await CartItem.findOne({ productId, user: userId });

    if (cartItem) {
      cartItem.items.push({
        productId,
        quantity,
      });
    } else {
      cartItem = new CartItem({
        user: userId,
        items: [
          {
            productId,
            quantity,
          },
        ]
      });
    }

    await cartItem.save();

    res.status(200).json({
      success: true,
      data: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to add item to cart",
    });
  }
};

// Delete a cart item

exports.deleteCartItem = async (req, res) => {
  const { productId } = req.body;

  try {
    const userId = req.user._id;

    const cartItem = await CartItem.findOne({ user: userId });

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, error: "Cart item not found" });
    }

    const itemIndex = cartItem.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, error: "Item not found in the cart" });
    }

    cartItem.items.splice(itemIndex, 1);
    await cartItem.save();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
