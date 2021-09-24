pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Bid is ERC721 {
    event NftBought(address _seller, address _buyer, uint256 _price);

    uint256 tokenId;
    uint256 endTime;
    uint256 public maxBidPrice;
    address maxPriceBuyer;
    bool soldOut;
    address public owner;

    constructor(uint256 _tokenId, uint256 _endTime) ERC721('MyToken', 'MyT') {
        tokenId = _tokenId;
        endTime = _endTime;
        maxBidPrice = 0;
        soldOut = false;
        owner = msg.sender;
        console.log("Bid init...");
    }

    function bid(uint256 price) external {
      console.log("bid", price);
      require(soldOut == false, "Has been sold");
      require(price > 0, 'This token is not for sale');
      require(block.timestamp < endTime, "Bid expired");

      if (price > maxBidPrice) {
        maxPriceBuyer = msg.sender;
        maxBidPrice = price;
      }
    }
    
    function buy() external payable {
        require(block.timestamp > endTime, "Bid not expired yet.");
        require(msg.sender == maxPriceBuyer, 'maxPriceBuyer required');
        require(soldOut == false, "Has been sold");
    
        address seller = ownerOf(tokenId);
        _transfer(seller, msg.sender, tokenId);

        // not for sale anymore
        soldOut = true;
        
        // send the ETH to the seller
        payable(seller).transfer(maxBidPrice);

        emit NftBought(seller, msg.sender, maxBidPrice);
    }
}