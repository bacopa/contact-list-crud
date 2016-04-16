"use strict";


	$(function () {


		$("#saveContact").click(create);
		renderList();
		$(".card").on("click", viewContact);
	})
		var ContactsStorage = {

			//read
			get: function () {
				try {
					var contactList = JSON.parse(localStorage.contactList)
				} catch (err) {
					var contactList = [];
				}
			return contactList;
			},
			write: function (contactList) {
				localStorage.contactList = JSON.stringify(contactList);
			}	

		}

		function renderList () {

			var contactList = ContactsStorage.get();
			var $cards = contactList.map(function (contact) {
				var clone = $(".card-template").clone();
				clone.removeClass("card-template");
				clone.find(".firstName").text(contact.firstName);
				clone.find(".lastName").text(contact.lastName);
				clone.find(".phone").text(contact.phone);
				clone.find(".email").text(contact.email);
				clone.find(".address").text(contact.address);

				return clone;
			});

			$("#card-container").empty().append($cards);
		}

		function destroy () {

			//read
			var contactList = ContactsStorage.get();

			//modify
			contactList.splice($(this).index(), 1);
		
			//write
			ContactsStorage.write(contactList);

			//update page
			renderList();
		}

		function create () {

			var contact = {
				firstName : $("#firstName").val(),
				lastName : $("#lastName").val(),
				phone : $("#phone").val(),
				email : $("#email").val(),
				address : $("#address").val(),
				photo : $("#photoEdit").val()
			}
			
			var contactList = ContactsStorage.get();
			contactList.push(contact);
			ContactsStorage.write(contactList)

			var clone = $(".card-template").clone();
			clone.removeClass("card-template");
			clone.find(".firstName").text(contact.firstName);
			clone.find(".lastName").text(contact.lastName);
			clone.find(".phone").text(contact.phone);
			clone.find(".email").text(contact.email);
			clone.find(".address").text(contact.address);

			$("#card-container").append(clone);
			
			
		}

		function viewContact (event) {
			
			var index = $(this).index();
			var contactList = ContactsStorage.get();
			var contact = contactList[index];
			var modal = $("#editContactModal");


			$(modal).find("#firstNameEdit").attr("value", contact.firstName);
			$(modal).find("#lastNameEdit").attr("value", contact.lastName);
			$(modal).find("#phoneEdit").attr("value", contact.phone);
			$(modal).find("#emailEdit").attr("value", contact.email);
			$(modal).find("#addressEdit").attr("value", contact.address)
			$(modal).find("#photoEdit").attr("value", contact.photo);
			
			$("#editContactModal").replaceWith(modal);

			$("#deleteBtn").click(function () {

				//modify
				contactList.splice(index, 1);
			
				//write
				ContactsStorage.write(contactList);

				//update page
				renderList();				
			})

			$("#editContactSaveBtn").click(function () {

				contact = {

					firstName : $("#firstNameEdit").val(),
					lastName : $("#lastNameEdit").val(),
					phone : $("#phoneEdit").val(),
					email : $("#emailEdit").val(),
					address : $("#addressv").val(),
					photo : $("#photoEdit").val()
				}

				//update
				contactList[index] = contact;

				//write
				ContactsStorage.write(contactList);

				//update page
				renderList();
			})
			
		}


	


