// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "hardhat/console.sol";

contract StokeMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _offerCounter; // start from 1
    
    address payable public marketowner;

    struct Offer {
        address sender;
        uint256 amount;
        uint256 expiresAt;
    }

    struct Token {
        uint256 tokenId;
        string tokenURI;
    }

    constructor() {
        marketowner = payable(msg.sender);
    }

    modifier onlyByOwner {
        require(msg.sender == marketowner, "You are not an owner of Marketplace.");
        _;
    }

    function accept(
        Offer memory offer,
        address WETH,
        address _nftContract,
        Token memory token
    ) public {
        require(offer.expiresAt >= block.timestamp, "MarketPlace: the offer expired");

        //calc service fee -2.5%
        uint marketFeePercentage = 25;
        uint commissionDenominator = 1000;
        uint serviceFee = offer.amount * marketFeePercentage / commissionDenominator;
        
        uint256 balance = IERC20(WETH).balanceOf(offer.sender);
        require(balance >= offer.amount, "MarketPlace: Offer sender has no enought token");
        //approve feature
        (bool success,) = WETH.call(abi.encodeWithSignature("_approve(address,address,uint256)", offer.sender, address(this), offer.amount));
        console.log(success);

         //transfer nft
         (bool success1,) = _nftContract.call(
            abi.encodeWithSignature(
                "createToken(uint256,address,string)",
                token.tokenId,
                offer.sender,
                token.tokenURI
            )
        );
        console.log(success1);

        require(IERC20(WETH).allowance(offer.sender, address(this)) == offer.amount, "insufficient amount");

        //transfer weth token
        IERC20(WETH).transferFrom(offer.sender, msg.sender, (offer.amount - serviceFee));
        //transfer market fee to market owner
        IERC20(WETH).transferFrom(offer.sender, marketowner, serviceFee);
    }

    function buyOrder(address payable _recipient, uint256 _tokenId, address _nftContract) public payable {
        require(IERC721(_nftContract).getApproved(_tokenId) == address(this), "MarketPlace: The token must be approved to marketplace");
        //transfer NFT
        IERC721(_nftContract).transferFrom(_recipient, msg.sender, _tokenId);
        //transfer ETH
        _recipient.transfer(msg.value);
    }
}