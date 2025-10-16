// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VetRelief {
    struct Shelter {
        uint id;
        string name;
        address wallet;
        bool verified;
    }

    struct Donation {
        uint id;
        uint shelterId;
        address donor;
        uint amount;
        string receipt; // Transaction hash as receipt
    }

    uint public shelterCount;
    uint public donationCount;

    mapping(uint => Shelter) public shelters;
    mapping(uint => Donation) public donations;

    event ShelterAdded(uint id, string name, address wallet);
    event DonationMade(uint id, uint shelterId, address donor, uint amount, string receipt);

    function addShelter(string memory _name, address _wallet) public {
        shelterCount++;
        shelters[shelterCount] = Shelter(shelterCount, _name, _wallet, true);
        emit ShelterAdded(shelterCount, _name, _wallet);
    }

    function donate(uint _shelterId) public payable {
        require(shelters[_shelterId].verified, "Shelter not verified");
        donationCount++;
        donations[donationCount] = Donation(donationCount, _shelterId, msg.sender, msg.value, "");
        emit DonationMade(donationCount, _shelterId, msg.sender, msg.value, "");
        payable(shelters[_shelterId].wallet).transfer(msg.value);
    }
}
