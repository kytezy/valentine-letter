$(document).ready(function() {
    var envelope = $("#envelope");
    var btn_open = $("#open");
    var btn_reset = $("#reset");
    var btn_share = $("#share");
    var shareNotice = $(".share-notice");

    envelope.click(function() {
        open();
    });
    btn_open.click(function() {
        open();
    });
    btn_reset.click(function() {
        close();
    });
    btn_share.click(function() {
        shareCard();
    });

    function open() {
        envelope.addClass("open")
            .removeClass("close");
    }

    function close() {
        envelope.addClass("close")
            .removeClass("open");
    }

    function shareCard() {
        var shareUrl = window.location.href;
        shareNotice.text("");
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: "Check out my Valentine e-letter!",
                url: shareUrl
            }).then(function() {
                shareNotice.text("Shared! 🎉");
                resetNotice();
            }).catch(function() {
                shareNotice.text("Sharing canceled.");
                resetNotice();
            });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl).then(function() {
                shareNotice.text("Link copied to clipboard.");
                resetNotice();
            }).catch(function() {
                shareNotice.text("Unable to copy link.");
                resetNotice();
            });
        } else {
            shareNotice.text("Share this URL: " + shareUrl);
            resetNotice();
        }
    }

    function resetNotice() {
        setTimeout(function() {
            shareNotice.text("");
        }, 4000);
    }

})